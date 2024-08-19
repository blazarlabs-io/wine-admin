/* eslint-disable @next/next/no-img-element */
"use client";

import { DynamicQrCodes } from "@/typings/data";
import {
  deleteQrCode,
  getDynamicQrCodes,
  updateQrCode,
} from "@/utils/firestoreUtils";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Input,
  DialogTrigger,
} from "@/components";
import Link from "next/link";
import { Copy, Edit, Trash } from "lucide-react";
import { useToast } from "@/components";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export const QrCodeViewer = () => {
  const { toast } = useToast();

  const [qrCodes, setQrCodes] = useState<DynamicQrCodes[]>([]);
  const [showEditQrCode, setShowEditQrCode] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [editQrCode, setEditQrCode] = useState<DynamicQrCodes | null>(null);

  const mountRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      getDynamicQrCodes()
        .then((data) => {
          console.log(data);
          setQrCodes(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const unsub = onSnapshot(collection(db, "dynamicQrCodes"), (snapshot) => {
      const codes = [] as DynamicQrCodes[];
      snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const qrCode = doc.data() as DynamicQrCodes;
        codes.push(qrCode);
      });
      setQrCodes(codes);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleEdit = async (qrCode: DynamicQrCodes) => {
    qrCode.redirectUrl = redirectUrl as string;
    try {
      await updateQrCode(qrCode);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (qrCode: DynamicQrCodes) => {
    try {
      await deleteQrCode(qrCode.docId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showEditQrCode && (
        <Dialog
          open={showEditQrCode}
          onOpenChange={() => {
            setShowEditQrCode(false);
            setEditQrCode(null);
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Redirect URL</DialogTitle>
              <DialogDescription>
                Edit the redirect URL for the QR Code below and click save
                changes.
              </DialogDescription>
            </DialogHeader>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <Label htmlFor="redirect-url" className="">
                Redirect URL
              </Label>
              <Input
                id="redirect-url"
                onChange={(e) => setRedirectUrl(e.target.value)}
                value={redirectUrl as string}
                className=""
              />
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  handleEdit(editQrCode as DynamicQrCodes);
                  setShowEditQrCode(false);
                  setEditQrCode(null);
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Qr Code</TableHead>
            <TableHead>Static URL</TableHead>
            <TableHead>Redirect URL</TableHead>
            <TableHead className="">Image URL</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qrCodes.map((qrCode) => (
            <TableRow key={qrCode.staticUrl}>
              <TableCell className="font-medium">
                <Link href={qrCode.imageUrl} target="__blank">
                  <img
                    src={qrCode.imageUrl}
                    alt="qr-code"
                    width={100}
                    height={100}
                  />
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-[4px]">
                  <span className="max-w-[280px] truncate">
                    {qrCode.staticUrl}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(qrCode.staticUrl);
                      toast({
                        title: "Copied",
                        description: "Static URL copied to clipboard",
                      });
                    }}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-[4px]">
                  <span className="max-w-[280px] truncate">
                    {qrCode.redirectUrl}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(qrCode.redirectUrl);
                      toast({
                        title: "Copied",
                        description: "Redirect URL copied to clipboard",
                      });
                    }}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-[4px]">
                  <span className="max-w-[280px] truncate">
                    {qrCode.imageUrl}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(qrCode.imageUrl);
                      toast({
                        title: "Copied",
                        description: "Image URL copied to clipboard",
                      });
                    }}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-[4px]">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setRedirectUrl(qrCode.redirectUrl);
                      setShowEditQrCode(true);
                      setEditQrCode(qrCode);
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Delete Dynamic Qr Code</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this QR Code?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            handleDelete(qrCode);
                          }}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
